module Spree
  module Api
    Ams.setup do |config|

      # This list determines which outside domains can communicate with the AMS API.  Use '*' for wildcard.
      config.cors_whitelist = 'http://localhost:9000'

    end
  end
end