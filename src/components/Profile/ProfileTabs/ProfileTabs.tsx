import { FC, ReactElement, useContext } from "react";
import { IUserData } from "../../../common/types";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import ProfileHealth from "../ProfileHealth/ProfileHealth";
import { AppContext } from "../../../context/AppContext/AppContext";
import ProfileAdminPanel from "../ProfileAdminPanel/ProfileAdminPanel";
import { UserRoles } from "../../../common/enums";

const ProfileTabs: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {
  const { userData } = useContext(AppContext);

  const isMe = profile.handle === userData!.handle;
  const amAdmin = userData!.role === UserRoles.Admin;

  return (
    <Tabs px={{ base: 0, md: 12 }} mt={2} align="start" isLazy={true}>
      <TabList>
        {isMe && <Tab>Health</Tab>}
        <Tab>Details</Tab>
        {isMe && amAdmin && <Tab>Admin Panel</Tab>}
      </TabList>
      <TabPanels>
        {isMe && (
          <TabPanel>
            <ProfileHealth />
          </TabPanel>
        )}
        <TabPanel>
          <ProfileDetails profile={profile} />
        </TabPanel>
        {isMe && amAdmin && (
          <TabPanel>
            <ProfileAdminPanel />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
