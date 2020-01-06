package home;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

public class HomeController {

    @RequestMapping("/home")
    public String home(){
        return "home";
    }

    @RequestMapping("/login")
    public  String loginPage(){
        return "login";
    }

    @RequestMapping("/logout-success")
    public  String logoutPage(){
        return "logout";
    }

    @RequestMapping("user")
    @ResponseBody
    public Principal user(Principal principal) {
        return principal;
    }
}
