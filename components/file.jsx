import React from 'react'
import PropTypes from 'prop-types'
import { buildUrl } from 'utils/api_http'
import { styled } from 'utils/theme'
import decorate from 'utils/decorate'
import Button from "./button"
import FaIcon from "./fa_icon";

export class File extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    defaultSrc: PropTypes.string,
    onClick: PropTypes.func,
    uid: PropTypes.string,
  }

  static defaultProps = {
    crop: false,
    background: false,
    alt: ``,
  }

  get url() {
    const { uid } = this.props
    const params = { uid }
    return buildUrl([`file`], params)
  }

  render() {
    const { defaultSrc, uid, children } = this.props

    let url = this.url
    if (!uid) { url = defaultSrc }

    return (
      <Button
        href={url}
        className={`file ${this.props.className}`}
        onClick={this.props.onClick}
        target='_blank'
        buttonStyle='download common'
      >
        <FaIcon icon='download' size={1.3} />
        { children }
      </Button>
    )
  }

}
export default decorate(
  styled`
    color: white;
    font-weight: 600;
    i {
      margin-right: 6px;
      color: white;
    }
  `,
  File
)