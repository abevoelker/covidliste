import React from "react";
import { pick } from "lodash";
import { useMutation } from "react-query";
import { Formik, Field, Form } from "formik";
import { api } from "react/shared/api";
import { RootWrapper } from "react/shared/RootWrapper";
import { CampaignCreatorReach } from "react/partners/campaign_creator/CampaignCreatorReach";

const _CampaignCreator = ({ initialCampaign, vaccinationCenter }) => {
  const createCampaign = useMutation(
    (campaign) =>
      api.post(
        `/partners/vaccination_centers/${vaccinationCenter.id}/campaigns.json`,
        {
          campaign,
        }
      ),
    { onSuccess: (data) => window.location.assign(data.redirectTo) }
  );
  return (
    <div className="CampaignCreator">
      {createCampaign.isError && (
        <div className="alert alert-danger" role="alert">
          Une erreur s'est produite. Contactez-nous à partenaires@covidliste.com
        </div>
      )}

      <Formik
        initialValues={{
          ...pick(initialCampaign, [
            "availableDoses",
            "vaccineType",
            "startsAt",
            "endsAt",
            "minAge",
            "maxAge",
            "maxDistanceInMeters",
          ]),
          extraInfo: "",
        }}
        onSubmit={createCampaign.mutate}
      >
        <Form>
          <h2>Doses et disponibilité</h2>
          <label htmlFor="availableDoses">Doses</label>
          <Field name="availableDoses" />

          <label htmlFor="vaccineType">Type</label>
          <Field as="select" name="vaccineType">
            <option value="astrazeneca">AstraZeneca</option>
            <option value="pfizer">Pfizer</option>
            <option value="moderna">Moderna</option>
            <option value="janssen">Janssen / Johnson & Johnson</option>
          </Field>

          <h2>Sélection des volontaires</h2>
          <label htmlFor="extraInfo">Extra Info</label>
          <Field name="extraInfo" placeholder="jane@acme.com" as="textarea" />

          <label htmlFor="minAge">Age mini</label>
          <Field name="minAge" />

          <label htmlFor="maxAge">Age maxi</label>
          <Field name="maxAge" />

          <label htmlFor="maxDistanceInMeters">Distance</label>
          <Field name="maxDistanceInMeters" />

          <h2>Lancer la campagne</h2>
          <CampaignCreatorReach vaccinationCenter={vaccinationCenter} />
          <button className="btn btn-danger btn-lg" type="submit">
            Lancer la campagne
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export const CampaignCreator = RootWrapper(_CampaignCreator);
