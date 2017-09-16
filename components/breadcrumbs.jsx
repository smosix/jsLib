import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { history } from 'utils/router'
import home from 'images/home.svg'
import { Grid, GridItem } from 'lib/components/grid'
import { styled, t } from 'utils/theme'
import { small_icon } from 'utils/common_styles'
import Wrapper from "./wrapper";

@styled`
  color: ${t('lightText')};
  box-shadow: ${t('shadow1')};
  color: white;
  font-weight: 600;
  .breadcrumb__link {
    border-bottom: 0;
  }
  img {
    ${small_icon}
  }
  a {
    color: white;
  }
`
export default class Breadcrumbs extends React.Component {

  static propTypes = {
    breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    breadcrumbs: [],
  }

  renderBreadcrumb({name, href}) {
    return (
      <span key={href}>
        <span> > </span>
        <Link className='breadcrumb__link' to={href}>{name}</Link>
      </span>
    )
  }

  render() {
    return(
      <Wrapper width="1600" className={this.props.className} background={this.props.theme.secondary}>
        <Grid>
          <GridItem weight={5/6}>
            <span>
              <Link className='breadcrumb__link' to='/'>
                <img src={home} />
              </Link>
            </span>
            {this.props.breadcrumbs.map(this.renderBreadcrumb)}
          </GridItem>
          <GridItem align="right" weight={1/6}>
            <a onClick={ history.goBack } >Back</a>
          </GridItem>
        </Grid>
      </Wrapper>
    )
  }
}
