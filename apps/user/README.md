#11/4 i ran into a problem of edge compatibility issue
[After a lot of reading documentation finally i got to conclusion that] - i didn't find the edge/compatibility page firstly .

- First thing Middleware runs in edge environment
- Traditionally postgres uses the TCP protocol for establishing the connection which is nodejs core
- Since the edge is lightweight runtime it may or maynot support it so db provider kind of figured out that we can estalish connection with http protocol as well.
- Thus we use the adapter in the non edge environment to maintain session throught the database from the cookie
- Credential Provider don't need the database session management thus we kind of implemented as jwt session
- OAuth themself use the database session management strategy by default
