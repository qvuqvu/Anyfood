import Button from "./buttons/Button1";
import useLoginModal from "./hooks/useLoginModal";
import useRegisterModal from "./hooks/useRegisterModal";
import Avatar from "./nav/Avatar";

const EmptyUserStatus = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  return (
    <div className="flex flex-col gap-3 shadow-lg border-gray-200 border-[1px] px-4 py-8 rounded-xl">
      <div className="flex font-pops text-[27px]  ">
        Join the community to get the best food experience! 
      </div>
      <hr />
      <div className="flex gap-6">
        <Button small label="Sign in" onClick={loginModal.onOpen} />
        <Button outline label="Sign up" onClick={registerModal.onOpen} />
      </div>
    </div>
  );
};

export default EmptyUserStatus;
