package com.TicketTime.TicketTime.security.oauth2.user;

<<<<<<< Updated upstream
public class OAuth2UserInfoFactory {
}
=======
import com.TicketTime.TicketTime.exception.OAuth2AuthenticationProcessingException1;
import com.TicketTime.TicketTime.model.AuthProvider1;

import java.security.AuthProvider;
import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(AuthProvider1.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider1.facebook.toString())) {
            return new FacebookOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider1.github.toString())) {
            return new GithubOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException1("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
>>>>>>> Stashed changes
