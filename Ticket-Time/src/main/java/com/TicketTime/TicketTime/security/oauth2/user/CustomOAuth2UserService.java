package com.TicketTime.TicketTime.security.oauth2.user;

<<<<<<< Updated upstream
=======
import com.TicketTime.TicketTime.exception.OAuth2AuthenticationProcessingException1;
import com.TicketTime.TicketTime.model.AuthProvider1;
>>>>>>> Stashed changes
import com.TicketTime.TicketTime.repository.UserRepository;
import com.TicketTime.TicketTime.security.oauth2.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.TicketTime.TicketTime.model.User;

import java.security.AuthProvider;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
<<<<<<< Updated upstream
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
=======
            throw new OAuth2AuthenticationProcessingException1("Email not found from OAuth2 provider");
>>>>>>> Stashed changes
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if(userOptional.isPresent()) {
            user = userOptional.get();
<<<<<<< Updated upstream
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
=======
            if(!user.getProvider().equals(AuthProvider1.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException1("Looks like you're signed up with " +
>>>>>>> Stashed changes
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
<<<<<<< Updated upstream
        User user = new User();

        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());
=======
        User user = new User(null,null);

        user.setProvider(AuthProvider1.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setImageURL(oAuth2UserInfo.getImageUrl());
>>>>>>> Stashed changes
        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
<<<<<<< Updated upstream
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
=======
        existingUser.setImageURL(oAuth2UserInfo.getImageUrl());
>>>>>>> Stashed changes
        return userRepository.save(existingUser);
    }

}

