import React from 'react'
import PropTypes from 'prop-types'
import { buildUrl } from 'utils/api_http'
import invariant from 'invariant'

export class Image extends React.Component {

  static propTypes = {
    alt: PropTypes.string,
    background: PropTypes.bool,
    children: PropTypes.node,
    crop: PropTypes.bool,
    height: PropTypes.number,
    onClick: PropTypes.func,
    uid: PropTypes.string,
    width: PropTypes.number,
  }

  static defaultProps = {
    crop: false,
    background: false,
    alt: ``,
  }

  get url() {
    const { uid, width, height, crop } = this.props
    const params = { uid }
    if (height) params.size = `${width || height*1.5}x${height}`
    if (crop) params.crop = true
    return buildUrl([`image`], params)
  }

  render() {
    const { alt, background, children } = this.props

    invariant(!(background && alt), `background images don't accept alt tags`)

    if (background) {
      return (
        <div
          style={{ backgroundImage: `url(${this.url})` }}
          onClick={this.props.onClick}
          children={children}
        />
      )
    }

    invariant(!children, `images cant accept children unless marked as a background image`)

    return (
      <img alt={alt} onClick={this.props.onClick} src={this.url} />
    )
  }
}

export default Image