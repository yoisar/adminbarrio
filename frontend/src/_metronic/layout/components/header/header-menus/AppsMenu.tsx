import React from 'react'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MenuItem } from './MenuItem'

export function AppsMenu() {
  return (
    <MenuInnerWithSub title='Apps' to='/apps' menuPlacement='bottom-start' menuTrigger='click'>
      {/* PAGES */}
      <MenuInnerWithSub
        title='Chat'
        to='/apps/chat'
        icon='message-text-2'
        hasArrow={true}
        menuPlacement='right-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        <MenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <MenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <MenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </MenuInnerWithSub>
      <MenuItem icon='abstract-28' to='/apps/user-management/users' title='User management' />
    </MenuInnerWithSub>
  )
}