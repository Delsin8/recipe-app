import styled from 'styled-components'
import Layout from '../../components/layout'

const NotificationsPageStyled = styled.div`
  .profile-picture {
    flex-shrink: 0;
    width: 36px;
    height: 36px;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
`

const NotificationsPage = () => {
  return (
    <Layout>
      <NotificationsPageStyled className="flex align-center gap-small">
        {/* picture */}
        <div className="profile-picture">
          <img src="https://www.zastavki.com/pictures/1280x720/2009/Food___Pizza_Pizza_011915_26.jpg" />
        </div>
        {/* event */}
        <div className="fsize-negative-2">
          <span className="frame">Username</span>
          <span>
            {' '}
            has subscribed to your channel and added some random text to it.
          </span>
          {/* time */}
          <span className="fsize-negative-3" style={{ opacity: '.75' }}>
            {' '}
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </NotificationsPageStyled>
    </Layout>
  )
}

export default NotificationsPage
