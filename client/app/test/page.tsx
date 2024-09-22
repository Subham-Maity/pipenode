import { Test } from "@/components/test";
import {FirebaseAuthProtector} from "@/components/protect/firebase-protect-layout";

const Page = () => {
  return (
    <FirebaseAuthProtector>
      <Test />
    </FirebaseAuthProtector>
  );
};

export default Page;
