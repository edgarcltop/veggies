import React from 'react';

/* Redux */
import { useSelector } from 'react-redux';

/* React Router Dom */
import { Route, Switch } from 'react-router-dom';
import ScrollIntoView from 'components/UI/ScrollIntoView';

/* Page Imports */
import Landing from 'pages/landing/landing.page';
import Shop from 'pages/shop/shop.page';
import PreAdminPanel from 'pages/preadminpanel/wrapper';
import FarmerAdmin from 'pages/farmeradmin/wrapper';
import Checkout from 'pages/checkout/checkout.page';
import SuccessAnimation from 'components/UI/success/success.component';

/* App wrapper */
const App = () => {
  /* Pull out the userFarmer from the redux state */
  const currentUser = useSelector(({ login }) => login.user);

  return (
    <>
      <ScrollIntoView>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/shop" render={({ match }) => <Shop match={match} />} />
          <Route path="/checkout" render={({ match }) => <Checkout match={match} />} />
          <Route path="/success" render={({ match }) => <SuccessAnimation match={match} />} />
          <Route
            path="/farmer/admin"
            render={({ match }) =>
              /* 
            <FarmerAdmin/> is displayed only when the farmer is logged
            While using the render Method, you can pass other props besides match such as location
            */
              currentUser && currentUser.data.role === 'farmer' ? (
                <FarmerAdmin match={match} />
              ) : (
                <PreAdminPanel match={match} />
              )
            }
          />
        </Switch>
      </ScrollIntoView>
    </>
  );
};

export default App;
