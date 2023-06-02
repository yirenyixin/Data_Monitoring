package net.educoder.app.service;
import net.educoder.app.utils.kafkaClient;
import org.springframework.stereotype.Component;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
@ServerEndpoint("/websocket")
@Component
public class WebSocketServer {
    /**
     * 需求如下：
     * 客户端与Websocket服务端建立连接之后，启动 kafkaClient 线程，将当前 session 作为参数传入
     */
    /********** begin **********/
    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session) {
        //启动 kafkaClient 线程
        new Thread(new kafkaClient(session)).start();
    }
    /********** end **********/
}