package self.live.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
//@RequestMapping("/")
public class HealthCheckController {

    @GetMapping("/check")
    public String Hello(){
        return "I'm OK";
    }

    @GetMapping("/greeting")
    public ModelAndView greeting() {
        ModelAndView mav = new ModelAndView("/greeting");
        //Goods goods = goodsService.getGoods(gid)
        return mav;
        //return "greeting";
    }
}
