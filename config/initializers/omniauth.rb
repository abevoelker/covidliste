require "omniauth/strategies/pro_sante_connect"

Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :pro_sante_connect,
    name: :pro_sante_connect,
    scope: [:openid, :scope_all],
    issuer: Rails.env.production? ? "https://auth.esw.esante.gouv.fr" : "https://wallet.bas.esw.esante.gouv.fr",
    client_options: {
      identifier: ENV["PRO_SANTE_CONNECT_CLIENT_ID"],
      secret: ENV["PRO_SANTE_CONNECT_CLIENT_SECRET"],
      redirect_uri: "#{ENV["PLATFORM_URL"] || "www.covidliste.com"}/partners/auth/pro_sante_connect/callback",

      scheme: "https",
      port: 443,
      host: Rails.env.production? ? "wallet.esw.esante.gouv.fr" : "wallet.bas.esw.esante.gouv.fr",

      authorization_endpoint: "/auth",
      token_endpoint: "/auth/realms/esante-wallet/protocol/openid-connect/token",
      userinfo_endpoint: "/auth/realms/esante-wallet/protocol/openid-connect/userinfo",
      jwks_uri: "/auth/realms/esante-wallet/protocol/openid-connect/certs",
      end_session_endpoint: "/auth/realms/esante-wallet/protocol/openid-connect/logout"
    }
  )

  on_failure do |env|
    env["devise.mapping"] = Devise.mappings[:partner]
    SuperAdmins::OmniauthCallbacksController.action(:failure).call(env)
  end
end
