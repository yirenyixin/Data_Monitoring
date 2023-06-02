package net.educoder.app.controller;

import net.educoder.app.utils.WebToolUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.SocketException;
import java.net.UnknownHostException;

/**
 * 页面处理
 */
@Controller
public class PageController {

    @RequestMapping("/")
    public String PageMain(Model model) throws SocketException, UnknownHostException {
        String localIP = WebToolUtils.getLocalIP();
        model.addAttribute("ip", localIP);
        return "index";
    }


}
