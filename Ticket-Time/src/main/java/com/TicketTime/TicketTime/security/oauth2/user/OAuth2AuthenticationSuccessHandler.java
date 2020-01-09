<<<<<<< Updated upstream
package com.TicketTime.TicketTime.security.oauth2;

import com.TicketTime.TicketTime.exception.BadRequestException1;
=======
package com.TicketTime.TicketTime.security.oauth2.user;

import com.TicketTime.TicketTime.config.AppProperties1;
import com.TicketTime.TicketTime.exception.BadRequestException1;
import com.TicketTime.TicketTime.security.oauth2.TokenProvider;
>>>>>>> Stashed changes
import com.TicketTime.TicketTime.util.CookieUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

<<<<<<< Updated upstream
import static com.TicketTime.TicketTime.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;
=======
import static com.TicketTime.TicketTime.security.oauth2.user.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;
>>>>>>> Stashed changes

@Component
public class OAuth2AuthenticationSuccessHandler<AppProperties> extends SimpleUrlAuthenticationSuccessHandler {

    private TokenProvider tokenProvider;

<<<<<<< Updated upstream
    private AppProperties appProperties;
=======
    private AppProperties1 appProperties;
>>>>>>> Stashed changes

    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;


    @Autowired
<<<<<<< Updated upstream
    OAuth2AuthenticationSuccessHandler(TokenProvider tokenProvider, AppProperties appProperties,
=======
    OAuth2AuthenticationSuccessHandler(TokenProvider tokenProvider, AppProperties1 appProperties,
>>>>>>> Stashed changes
                                       HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository) {
        this.tokenProvider = tokenProvider;
        this.appProperties = appProperties;
        this.httpCookieOAuth2AuthorizationRequestRepository = httpCookieOAuth2AuthorizationRequestRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new BadRequestException1("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String token = tokenProvider.createToken(authentication);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", token)
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return appProperties.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    // Only validate host and port. Let the clients use different paths if they want to
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}
