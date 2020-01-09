package com.TicketTime.TicketTime.security.oauth2;


<<<<<<< Updated upstream
import com.TicketTime.TicketTime.repository.UserRepository;
import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
=======
import com.TicketTime.TicketTime.exception.ResourceNotFoundException;
import com.TicketTime.TicketTime.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> Stashed changes
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
<<<<<<< Updated upstream
=======
import com.TicketTime.TicketTime.model.User;
>>>>>>> Stashed changes

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
<<<<<<< Updated upstream
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + email)
                );
=======
    public UserPrincipal loadUserByUsername(String email)
            throws UsernameNotFoundException {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new UsernameNotFoundException("User not found with email : " + email)
                    );
>>>>>>> Stashed changes

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
<<<<<<< Updated upstream
        User user = userRepository.findById(id).orElseThrow(
=======
        com.TicketTime.TicketTime.model.User user = userRepository.findById(id).orElseThrow(
>>>>>>> Stashed changes
                () -> new ResourceNotFoundException("User", "id", id)
        );

        return UserPrincipal.create(user);
    }
}