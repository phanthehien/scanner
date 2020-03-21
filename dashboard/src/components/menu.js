import React from "react"
import { withRouter, useRouteMatch } from "react-router-dom"
import { Menu, Breadcrumb } from "semantic-ui-react"

const MenuComponent = () => {
  const isCreate = useRouteMatch('/create')
  const isResult = useRouteMatch('/result')
  const isDetail = useRouteMatch('/result/:id')
  
  return (
    <Menu>
      <Menu.Item href="/create" active={isCreate && isCreate.isExact}>
        Create
      </Menu.Item>
      <Menu.Item href="/result" active={isResult && isResult.isExact}>
        List
      </Menu.Item>
      {
        isDetail && isDetail.isExact && 
        <Menu.Item active> 
          <Breadcrumb>
            <Breadcrumb.Divider icon='right arrow' />
            <Breadcrumb.Section active>
            Findings
            </Breadcrumb.Section>
          </Breadcrumb>
        </Menu.Item>
      }
    </Menu>
  )
};

export default withRouter(MenuComponent);
