import React from "react";
import { useQuery } from "react-query";
import { useFormikContext } from "formik";
import { api } from "react/shared/api";

export const CampaignCreatorReach = ({ vaccinationCenter }) => {
  const { values, isValid } = useFormikContext();
  const reachParams = {
    campaign: values,
  };
  const { isLoading, isError, data } = useQuery(["reach", reachParams], () =>
    api.post(
      `/partners/vaccination_centers/${vaccinationCenter.id}/campaigns/simulate_reach.json`,
      reachParams
    )
  );
  if (isError)
    return (
      <div className="alert alert-danger" role="alert">
        Une erreur s'est produite. Contactez-nous à partenaires@covidliste.com
      </div>
    );
  return (
    <div className="CampaignCreatorReach">
      {isLoading && "LOADING"}
      {!isLoading && <p>{data.reach} volontaires trouvés</p>}
    </div>
  );
};
