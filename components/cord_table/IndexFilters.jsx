import React from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Submit } from 'lib/components/forms'

import { observer } from 'mobx-react'
import { styled } from 'lib/utils/theme'

@styled`
  position: relative;
  .filter-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 20px;
    margin: 4px;
  }

`
@observer
export class IndexFilters extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    query: PropTypes.object,
  }

  handleChange = (e) => {
    this.props.query.search = e.value
  }

  handleSubmit = () => {
    this.props.query.execute()
  }

  render() {
    return (
      <Form className={this.props.className} onSubmit={this.handleSubmit}>
        <Input
          name="search"
          placeholder="Filter..."
          value={this.props.query.search}
          onChange={this.handleChange}
        />
        <Submit className="filter-button" value="Search" />
      </Form>
    )
  }

}
export default IndexFilters