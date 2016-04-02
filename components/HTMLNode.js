'use strict';
import React, {
  StyleSheet,
  Image,
  Component
} from 'react-native';
import Dimensions from 'Dimensions';

import HtmlRender from 'react-native-html-render'

var { width, height } = (function () {
  return Dimensions.get('window')
})()

var contentFontSize = 16

var styles = StyleSheet.create({
  img: {
    width: width - 30,
    height: width - 30,
    resizeMode: Image.resizeMode.contain
  }
})

var regs = {
  links: {
    link: /^https?:\/\/.*/,
    topic: /^https?:\/\/python-china\.org\/topic\/\w*/,
    user: /^https?:\/\/python-china\.org\/user\/\w*/
  }
}

class HTMLNode extends Component {
  constructor(props) {
    super(props)
  }
  _onLinkPress (url) {
    let router = this.props.router

    if (reg.links.link.test(url)) {
      if (regs.links.topic.test(url)) {
        let topicId = url.replace(/^https?:\/\/python-china\.org\/topic\//, '')
        console.log(topicId)
      }

      if (regs.links.user.test(url)) {
        let userName = url.replace(/^https?:\/\/python-china\.org\/user\//, '')
        console.log(userName)
      }
    }

    if (/^mailto:\w*/.test(url)) {
      console.log('A mail!')
    }
  }
  _renderNode(node, index, parent, type) {
    let name = node.name

    var imgStyle = (this.props.style && this.props.style.img) || styles.img
    if (node.type === 'figure') {
      node = node.children[0]
    }

    if (node.type === 'block' && type === 'block') {
      if (name === 'img') {
        var uri = node.attribs.src
        if (/.*\.gif$/.test(uri)) return null
          return (
            <Image
                key={index}
                source={{uri:uri}}
                style={imgStyle} />
          )
      }
    }
  }
  render () {
    return (
      <HtmlRender
          value={this.props.content}
          stylesheet={this.props.style}
          onLinkPress={this._onLinkPress.bind(this)}
          renderNode={this._renderNode.bind(this)}
        />
    )
  }
}

module.exports = HTMLNode

