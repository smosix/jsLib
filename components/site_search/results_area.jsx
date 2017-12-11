import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'lib/utils/theme'
import { List, ListItem } from 'lib/components/list/index'
import { popover } from 'lib/utils/common_styles'
import decorate from 'lib/utils/decorate'
import Result from './Result'

export class ResultsArea extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    models: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    query: PropTypes.string,
    results: PropTypes.array,
  }

  state = {
    selectedIndex: 0,
  }

  componentDidMount() {
    window.addEventListener(`keydown`, this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener(`keydown`, this.handleKeyDown)
  }

  handleScrollTo = (pos) => {
    if (!this.elem) return
    this.elem.scrollTop = pos - 200
  }

  handleKeyDown = (e) => {
    switch (e.key) {
    case `ArrowDown`:
      this.handleArrowDown()
      break
    case `ArrowUp`:
      this.handleArrowUp()
      break
    default:
      return null
    }
  }

  handleArrowDown() {
    if (this.state.selectedIndex < this.props.results.length - 1) {
      this.setState(prevState => {
        return { selectedIndex: prevState.selectedIndex + 1 }
      }, this.scrollToSelected)
    }
  }

  handleArrowUp() {
    if (this.state.selectedIndex > 0) {
      this.setState(prevState => {
        return { selectedIndex: prevState.selectedIndex - 1 }
      }, this.scrollToSelected)
    }
  }

  getResultKey(result) {
    const { searchable_type, searchable_id } = result
    return `${searchable_type}--${searchable_id}`
  }

  renderResult = (result, i) => {
    const { selectedIndex } = this.state
    return (
      <ListItem key={this.getResultKey(result)}>
        <Result
          type={result.searchable_type}
          result={result}
          selected={selectedIndex===i}
          onScrollTo={this.handleScrollTo}
          onClick={this.props.onClick}
          models={this.props.models}
        />
      </ListItem>
    )
  }

  renderEmptyResults() {
    return (
      <div className="search-dropdown__container">
        <div className="search-dropdown search-dropdown--no-results">
        Sorry, no results found
        </div>
      </div>
    )
  }

  setRef = (elem) => this.elem = elem

  render() {
    const { results, className } = this.props
    if (results.length === 0) return this.renderEmptyResults()
    return (
      <div className={className} ref={this.setRef}>
        <List spacing="none" className="search-dropdown" separator>
          {results.map(this.renderResult)}
        </List>
      </div>
    )
  }

}
export default decorate(

  styled`
    ${popover}
    width: 500px;
    margin-top: -10px;
    font-size: 0.9em;
    z-index: 5000;

    .search-dropdown {
      position: relative;
      z-index: 20001;

      &__result {
        padding: 8px;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: block;
        color: ${t(`text`)};
        p { margin: 0 }
        b {
          color: ${t(`lightText`)};
          font-size: 0.8em;
        }

        &:hover,
        &--selected {
          background-color: ${t(`border`)};
        }
      }
    }

  `,
  ResultsArea
)