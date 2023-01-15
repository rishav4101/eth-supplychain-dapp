import Grid from '@material-ui/core/Grid'
import SignUp from './SignUp'

const Auth = () => {
  return (
    <Grid
      container
      spacing={3}
      style={{ height: '100%', minHeight: '90vh', width: '100%' }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        style={{
          minHeight: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <img
          alt="."
          src="/homeArt.png"
          style={{ width: '90%', height: 'auto' }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        style={{
          minHeight: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: 'column'
        }}
      >
        <SignUp />
      </Grid>
    </Grid>
  )
}

export default Auth
