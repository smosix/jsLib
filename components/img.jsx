import React from 'react'
import PropTypes from 'prop-types'

export class Img extends React.Component {
  static propTypes = {
    alt: PropTypes.string
  }

  static defaultProps = {
    alt: '',
  }

  render() {
    return (
      <img alt={this.props.alt} {...this.props} />
    )
  }
}
export default Img
