import React from 'react'
import { Tag, VerifiedIcon, CommunityIcon, RefreshIcon, AutoRenewIcon, TagProps } from 'easybake-uikit' // EthereumIcon

const CoreTag: React.FC<TagProps> = (props) => {
  return (
    <Tag variant="secondary" outline startIcon={<VerifiedIcon width="18px" color="secondary" mr="4px" />} {...props}>
      Core
    </Tag>
  )
}

const CommunityTag: React.FC<TagProps> = (props) => {
  return (
    <Tag variant="failure" outline startIcon={<CommunityIcon width="18px" color="failure" mr="4px" />} {...props}>
      Community
    </Tag>
  )
}

const EthereumTag: React.FC<TagProps> = (props) => {
  return (
    <Tag variant="secondary" outline startIcon={<VerifiedIcon width="18px" color="secondary" mr="4px" />} {...props}>
      Ethereum
    </Tag>
  )
}

const DualTag: React.FC<TagProps> = (props) => {
  return (
    <Tag variant="textSubtle" outline {...props}>
      Dual
    </Tag>
  )
}

const ManualPoolTag: React.FC<TagProps> = (props) => {
  return (
    <Tag variant="secondary" outline startIcon={<RefreshIcon width="18px" color="secondary" mr="4px" />} {...props}>
      Manual
    </Tag>
  )
}

const CompoundingPoolTag: React.FC<TagProps> = (props) => {
  return (
    <Tag variant="success" outline startIcon={<AutoRenewIcon width="18px" color="success" mr="4px" />} {...props}>
      Auto
    </Tag>
  )
}

export { CoreTag, CommunityTag, EthereumTag, DualTag, ManualPoolTag, CompoundingPoolTag }
