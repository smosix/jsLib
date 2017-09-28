import React from 'react'
import PropTypes from 'prop-types'
import { buildUrl } from 'utils/api_http'
import invariant from 'invariant'
import { styled, p } from 'utils/theme'
import decorate from 'utils/decorate'

export class Image extends React.Component {

  static propTypes = {
    alt: PropTypes.string,
    background: PropTypes.bool,
    children: PropTypes.node,
    crop: PropTypes.bool,
    defaultSrc: PropTypes.string,
    height: PropTypes.number,
    onClick: PropTypes.func,
    uid: PropTypes.string,
    width: PropTypes.number,
    size: PropTypes.string,
  }

  static defaultProps = {
    crop: false,
    background: false,
    alt: ``,
  }

  get url() {
    const { uid, width, height, crop, size } = this.props
    const params = { uid, size }
    if (height && !size) params.size = `${width || height*1.5}x${height}`
    if (crop) params.crop = true
    return buildUrl([`image`], params)
  }

  render() {
    const { alt, background, children, defaultSrc, uid } = this.props

    invariant(!(background && alt), `background images don't accept alt tags`)

    let url = this.url
    if (!uid) { url = defaultSrc }

    if (background) {
      return (
        <div
          style={{ backgroundImage: `url(${url})` }}
          onClick={this.props.onClick}
          children={children}
          className={this.props.className}
        />
      )
    }

    invariant(!children, `images cant accept children unless marked as a background image`)

    return (
      <img
        alt={alt} onClick={this.props.onClick} src={url}
        className={`image ${this.props.className}`}
      />
    )
  }
}
export default decorate(
  styled`
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    ${({ height }) => {
      if(height) {
        return `height: ${height}px;`
      }
    }}
  `,
  Image
)
