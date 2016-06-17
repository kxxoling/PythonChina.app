import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
} from 'react-native';

import Dimensions from 'Dimensions';

const { width, height } = (function getWidthHeight() {
  return Dimensions.get('window');
}());

const styles = StyleSheet.create({
  img: {
    width: width - 30,
    height: height - 30,
    resizeMode: Image.resizeMode.contain,
  },
});

const regs = {
  links: {
    link: /^https?:\/\/.*/,
    topic: /^https?:\/\/python-china\.org\/topic\/\w*/,
    user: /^https?:\/\/python-china\.org\/user\/\w*/,
  },
};

class HTMLNode extends Component {
  constructor(props) {
    super(props);
    this._onLinkPress = this._onLinkPress.bind(this);
    this._renderNode = this._renderNode.bind(this);
  }

  _onLinkPress(url) {
    if (regs.links.link.test(url)) {
      if (regs.links.topic.test(url)) {
        const topicId = url.replace(/^https?:\/\/python-china\.org\/topic\//, '');
        console.log(topicId);
      }

      if (regs.links.user.test(url)) {
        const userName = url.replace(/^https?:\/\/python-china\.org\/user\//, '');
        console.log(userName);
      }
    }

    if (/^mailto:\w*/.test(url)) {
      console.log('A mail!');
    }
    return;
  }
  _renderNode(_node, index, parent, type) {
    let node = _node;
    const name = node.name;

    const imgStyle = (this.props.style && this.props.style.img) || styles.img;
    if (node.type === 'figure') {
      node = node.children[0];
    }

    if (node.type === 'block' && type === 'block') {
      if (name === 'img') {
        const uri = node.attribs.src;
        if (/.*\.gif$/.test(uri)) return null;
        return (
          <Image
            key={index}
            source={{ uri }}
            style={imgStyle}
          />
        );
      }
    }
    return undefined;
  }
  render() {
    return (
      <Text>
        HTML content here
      </Text>
    );
  }
}

HTMLNode.propTypes = {
  style: React.PropTypes.object,
  content: React.PropTypes.string,
};

module.exports = HTMLNode;
