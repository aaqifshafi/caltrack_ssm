import React, { FC, ReactElement, useContext } from "react";
import PremiumContent from "../../components/Expert/PremiumContent/PremiumContent";
import ExpertTabs from "../../components/Expert/ExpertTabs/ExpertTabs";
import { AppContext } from "../../context/AppContext/AppContext";
import { UserRoles } from "../../common/enums";
import { handleCheckout } from "../../services/payment.services";

const ExpertView: FC = (): ReactElement => {
  const { userData } = useContext(AppContext);

  // Check if the user is an Ultra Premium or Admin member
  const isPremiumUser =
    userData?.role === UserRoles.UltraPremium ||
    userData?.role === UserRoles.Admin;

  const handleSubscribe = async () => {
    try {
      await handleCheckout({ priceId: "price_1PxrP7SCxQSEp1cmFWrd0hje" });
    } catch (error) {
      console.error("Checkout failed:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      {!isPremiumUser ? (
        <PremiumContent onSubscribe={handleSubscribe} />
      ) : (
        <ExpertTabs />
      )}
    </>
  );
};

export default ExpertView;
