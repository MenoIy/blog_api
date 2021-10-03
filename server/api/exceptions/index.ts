export class HttpException extends Error {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class Unauthorized extends HttpException {
  constructor() {
    super(401, "You're not authorized");
  }
}

export class UserNotFound extends HttpException {
  constructor() {
    super(404, 'User not found');
  }
}

export class EmailExist extends HttpException {
  constructor() {
    super(409, 'This email address is already being used');
  }
}

export class UsernameExist extends HttpException {
  constructor() {
    super(409, 'This username is already being used');
  }
}

export class WrongPassword extends HttpException {
  constructor() {
    super(401, "The password that you've entered is incorrect");
  }
}

export class WrongUsername extends HttpException {
  constructor() {
    super(401, "Username you entered isn't connected to an account");
  }
}

export class EmailNotVerified extends HttpException {
  constructor() {
    super(401, 'Account not verified, verify your email address');
  }
}

export class InvalidToken extends HttpException {
  constructor() {
    super(403, 'Invalid token');
  }
}

export class PostNotFound extends HttpException {
  constructor() {
    super(404, 'Post not found');
  }
}

export class CommentNotFound extends HttpException {
  constructor() {
    super(404, 'Comment not found');
  }
}
