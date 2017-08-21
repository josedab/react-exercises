import React from 'react'
import PropTypes from 'prop-types'
import { DuckContainer } from 'containers'
import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './DuckDetails.css'
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css'
import { RepliesContainer } from 'containers'
import { formatReply } from 'helpers/utils'

DuckDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

export default function DuckDetails({duckId, isFetching, authedUser, error}) {
  return (
    <div className={mainContainer}>
      {isFetching === true
        ? <p className={subHeader}>{'Fetching'}</p>
        : <div className={container}>
        <div className={content}>
          <DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn={true}/>
          MAKE REPLY
        </div>
        <div className={repliesContainer}>
          REPLY SECTION
        </div>
      </div>}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}