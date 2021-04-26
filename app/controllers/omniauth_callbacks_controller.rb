class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def pro_sante_connect
    upsert_service = UpsertPartnerForProSanteConnectService
      .perform_with(request.env["omniauth.auth"]["info"])

    flash[:success] = upsert_service.new_partner? ? "Votre compte a été créé" : "Vous êtes connecté·e"
    bypass_sign_in upsert_service.partner, scope: :partner
    redirect_to after_sign_in_path_for(upsert_service.partner)
  end
end
