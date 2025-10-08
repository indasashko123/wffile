import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { EventType, MessageSentEvent, UserJoinedEvent } from "../../../../core/domain/events";
import { NestEventBus } from "../events/event.bus";
import { Server, Socket } from "socket.io";
import { AUTH_CONSTANTS, EVENT_CONSTANTS } from "../constants";
import { Inject } from "@nestjs/common";
import { IAuthService } from "../../../../core/application";

interface AuthenticatedSocket extends Socket {
  user: {
    id: string;
    login: string;
  };
}


@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
        credentials: true,
    }
}
)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
    @WebSocketServer()
    private server: Server;
    private connectedUsers = new Map<string, { id: string; login: string; socketId: string }>();

    constructor(
        @Inject(EVENT_CONSTANTS.EVENT_BUS) private readonly eventBus: NestEventBus,
        @Inject(AUTH_CONSTANTS.AUTH_SERVICE) 
            private readonly authService: IAuthService
    ) {

    }

    async handleConnection(client: AuthenticatedSocket) {
        try {
            const token = this.extractToken(client);
                if (!token) {
                    client.disconnect();
                return;
            }
            const payload = this.authService.validateAccess(token);
      
            client.user = {
                id: payload.sub,
                login: payload.login
            };

            this.connectedUsers.set(client.id, {
                id: payload.sub,
                login: payload.login,
                socketId: client.id
            });
            this.eventBus.publish(new UserJoinedEvent(
                payload.sub,
                payload.login
            ));
        } catch (error) {
            client.disconnect();
        }
    }
  
    async handleDisconnect(client: AuthenticatedSocket) {
        const user = this.connectedUsers.get(client.id);
        if (user) {
            this.connectedUsers.delete(client.id);  
        }
    }
  

    @SubscribeMessage(EventType.send_message)
    handleMessage(client: AuthenticatedSocket, messageData: { content: string, userId: string, username: string }) {
        const user = client.user;
        this.eventBus.publish(new MessageSentEvent(
            messageData.userId,
            messageData.username, 
            messageData.content
        ));
    }

    private extractToken(client: Socket): string | null {
        const token = client.handshake.auth.token ||  client.handshake.query.token;
        return token ? String(token) : null;
    }
}