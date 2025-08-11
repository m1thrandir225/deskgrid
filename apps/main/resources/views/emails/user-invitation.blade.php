<!DOCTYPE html>
<html>
<head>
    <title>You have been invited!</title>
</head>
<body>
<h1>Hi, {{ $user->name }}!</h1>
<p>An account has been created for you. Please click the button below to set up your password and get started.</p>
<a href="{{ $passwordSetupUrl }}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">
    Set Your Password
</a>
<p>If you did not expect this, you can safely ignore this email.</p>
</body>
</html>
