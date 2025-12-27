import { UserLoginDto } from "@/application/dtos/user.dto";
import { FastifyReply, FastifyRequest } from "fastify";

class AuthController {
  static async login(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<any> {
    try {
      const { email, password } = request.body as UserLoginDto;
    } catch (error: any) {
      return reply.code(500).send({
        success: false,
        message: error.message,
      });
    }
  }
}

export default AuthController;
