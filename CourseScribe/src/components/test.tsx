import { useSession } from "next-auth/react";

import { DatabaseInit, UserExists } from "./../components/databaseFunctions";
import { getUserEmail } from "./miscFunctions";

export default function Test() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        {session ? (
          <button onClick={() => UserExists(getUserEmail(session))}>
            TEST DATABASE
          </button>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
  return <div>not logged in</div>;
}
