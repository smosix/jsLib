import React from "react"
import PropTypes from "prop-types"
import Image from "../image"
import Grid from "../grid"

export default class Tab extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string.isRequired,
    onTabHeadClick: PropTypes.func,
    renderHead: PropTypes.bool,
    selected: PropTypes.any,
    tabKey: PropTypes.any,
  }

  static defaultProps = {
    renderHead: false,
  }

  handleTabHeadClick = () => {
    const { onTabHeadClick, tabKey } = this.props
    onTabHeadClick(tabKey)
  }

  renderGrid(iconPresent) {
    const { heading, icon } = this.props
    if (iconPresent) {
      return (
        <div style={{ display: `flex` }}>
          <div style={{ minWidth: `30px`, marginRight: `16px` }}>
            <Image
              width={30}
              height={20}
              background
              contain
              defaultSrc={icon}
            />
          </div>
          <div
            style={{
              flex: 1,
              fontSize: `13px`,
              fontWeight: `600`,
              lineHeight: `18px`,
            }}
          >
            {heading}
          </div>
        </div>
      )
    }
    return (
      <Grid>
        <Grid.Item>{heading}</Grid.Item>
      </Grid>
    )
  }

  renderHead = () => {
    const { selected, tabKey, icon } = this.props
    const className = selected === tabKey ? `selected` : ``
    return (
      <div className={className} onClick={this.handleTabHeadClick}>
        {this.renderGrid(!!icon)}
      </div>
    )
  }

  render() {
    const { renderHead, children } = this.props
    if (renderHead) return this.renderHead()
    return <div>{children}</div>
  }
}
