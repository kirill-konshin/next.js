import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { addCount } from '../store/count/action'
import { startClock, serverRenderClock } from '../store/tick/action'
import { connect } from 'react-redux'
import Page from '../components/Page'
import { wrapper } from '../store/store'

const Other = props => {
  useEffect(() => {
    const timer = props.startClock()

    return () => {
      clearInterval(timer)
    }
  }, [props])

  return <Page title="Other Page" linkTo="/" />
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(serverRenderClock(true))
    store.dispatch(addCount())
  }
)

const mapDispatchToProps = dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Other)
