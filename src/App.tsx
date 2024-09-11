import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import { auth, db } from "./config/firebase-config.js";
import { AppContext } from "./context/AppContext/AppContext.js";
import RootLayout from "./views/RootLayout/RootLayout.jsx";
import LandingPage from "./views/LandingPage/LandingPage.jsx";
import ActivityView from "./views/ActivityView/ActivityView.jsx";
import ExpertView from "./views/ExpertView/ExpertView.jsx";
import ProfileView from "./views/ProfileView/ProfileView.jsx";
import NotFound from "./views/NotFound/NotFound.jsx";
import LogIn from "./views/LogIn/LogIn.jsx";
import SignUp from "./views/SignUp/SignUp.js";
import DietView from "./views/DietView/DietView.js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js";
import { IAppContextValue, IAppState, IUserData } from "./common/types.js";
import AboutView from "./views/AboutView/AboutView.js";
import ServerDown from "./views/ServerDown/ServerDown.js";
import SubscriptionSuccess from "./components/ProtectedRoute/SubscriptionSucess";
import SubscriptionCancel from "./components/ProtectedRoute/SubscriptionCancel.js";

const App: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [appState, setAppState] = useState<IAppState>({
    user,
    userData: null,
  });

  if (appState.user !== user) {
    setAppState({
      ...appState,
      user,
    });
  }

  useEffect(() => {
    if (!user) {
      return () => {
        return;
      };
    }

    return onValue(
      query(ref(db, `users`), orderByChild("uid"), equalTo(user.uid)),
      (snapshot) => {
        if (snapshot.exists()) {
          const userData = Object.values(snapshot.val())[0] as IUserData;
          setAppState({
            ...appState,
            userData,
          });
        }
      }
    );
  }, [user]);

  if (error) {
    return <ServerDown />;
  }

  if ((!loading && !user) || (!loading && user && appState.userData)) {
    return (
      <>
        <AppContext.Provider
          value={{ ...appState, setContext: setAppState } as IAppContextValue}
        >
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="about" element={<AboutView />} />
              <Route element={<ProtectedRoute />}>
                <Route path="login" element={<LogIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="activity" element={<ActivityView />} />
                <Route path="diet" element={<DietView />} />
                <Route path="expert" element={<ExpertView />} />
                <Route path="sucess" element={<SubscriptionSuccess />} />
                <Route path="cancel" element={<SubscriptionCancel />} />
                <Route path="profile/:handle" element={<ProfileView />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AppContext.Provider>
      </>
    );
  }

  return null;
};

export default App;
