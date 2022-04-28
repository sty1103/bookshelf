import style from '../scss/signin.module.scss';
import Button from './Button';
import React, { useRef } from 'react';
import { LoginReqType } from '../types';
import { useNavigate } from 'react-router-dom';
 
interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ login }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  return (
    <section className={style.home}>
      <div className={style.inner}>
        <div className={style.inner__left}>
          <img src="../images/bg_signin.png" alt="bg_signin" />
        </div>

        <div className={style.inner__right}>
          <div className={style.content}>
            <div>MY BOOKS</div>
            <div>PLEASE NOTE YOUR OPINION</div>
            <hr />

            <div className={style.form}>
              ID<span>*</span>
              <input type="text" placeholder="아이디" ref={emailRef} />
              Password<span>*</span>
              <input type="password" placeholder="비밀번호" ref={pwdRef} />

              <Button text={'Sign In'} click={click} />
            </div>
          </div>
        </div> 
      </div>
    </section>
  )

  function click() {
    const email = emailRef.current!.value;
    const pwd = pwdRef.current!.value;
    login({ email, pwd, navigate });
  }
}

export default Signin;