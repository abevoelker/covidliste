require "omniauth_openid_connect"

module OmniAuth
  module Strategies
    class ProSanteConnect < OpenIDConnect
      info do
        {
          sub: partner_info.sub,
          given_name: partner_info.given_name,
          family_name: partner_info.family_name,
          birthdate: partner_info.birthdate.presence && Date.parse(partner_info.birthdate),
          email: partner_info.email
        }
      end
    end
  end
end

OmniAuth.config.add_camelization("pro_sante_connect", "ProSanteConnect")
