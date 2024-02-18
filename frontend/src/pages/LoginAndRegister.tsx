import styles from '../styles/LoginAndRegister.module.scss'
import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { emailPattern, namePattern, passwordPattern } from '../utils/regex';
import { useMutation } from '@tanstack/react-query'
import fetchLoginAndRegister from '../apis/auth/RegisterAndLoginApi';
import { toast } from 'react-toastify';
import { UserContext } from '../hooks/ContextProvider';
import { ReducerTypes } from '../hooks';
import UserType from '../interfaces/api/userFace';
import { useNavigate } from 'react-router-dom';
import countries from '../utils/jsons/countries.json'

type TypesInput = { name: string, email: string, age: number | "", country: string, password: string, password2: string }

export const LoginAndRegister = ({ type }: { type: 'Login' | 'Register' }) => {
    const [inputValues, setInputValues] = useState<TypesInput>({ name: "", email: "", age: "", country: "", password: "", password2: "" })
    const [uiUpdates, setUichanges] = useState({ checks: false, password: true, password2: true })
    const { DispatchUser } = useContext(UserContext)
    const navigator = useNavigate()

    const LoginandRegisterMutation = useMutation({
        mutationKey: [type],
        mutationFn: () => fetchLoginAndRegister(type, inputValues),
        onSuccess: (data: { status: string, user: UserType, message: string }) => {

            if (data.status && data.status === "success") {
                toast.info('Welcome ' + data.user.name)
                DispatchUser({ type: ReducerTypes.addUser, payload: data.user })
                navigator('/home')
            } else {
                toast.warning(data.message)
            }
        }
    })

    useEffect(() => {
        setInputValues({ name: "", email: "", age: "", country: "", password: "", password2: "" })
        setUichanges({ checks: false, password: true, password2: true })
    }, [type])

    const NameCheck = useMemo(() => namePattern.test(inputValues.name), [inputValues.name])
    const AgeCheck = useMemo(() => typeof inputValues.age == 'number' && inputValues.age <= 100 && inputValues.age >= 18, [inputValues.age])
    const CountryCheck = useMemo(() => countries.some((ele) => ele.code == inputValues.country), [inputValues.country])
    const EmailCheck01 = useMemo(() => emailPattern.test(inputValues.email), [inputValues.email])
    const PasswordCheck = useMemo(() => passwordPattern.test(inputValues.password), [inputValues.password])
    const PasswordCheck02 = useMemo(() => inputValues.password === inputValues.password2 && inputValues.password2.length > 8, [inputValues.password2, inputValues.password])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!uiUpdates.checks) setUichanges((prev) => ({ ...prev, checks: true }))
        if (type === "Register") {
            if (NameCheck && EmailCheck01 && PasswordCheck && PasswordCheck02) {
                LoginandRegisterMutation.mutate()
            } else {
                toast.error("Please check - " + (!NameCheck ? "Name " : "") + (!EmailCheck01 ? "Email " : "") + (!AgeCheck ? "Age " : "") + (!CountryCheck ? "Country " : "") + (!PasswordCheck ? "Password " : "") + (!PasswordCheck02 ? "Password2" : ""))
            }
        } else if (type === "Login") {
            if (EmailCheck01 && PasswordCheck) {
                LoginandRegisterMutation.mutate()
            } else {
                toast.error("Please check - " + (!EmailCheck01 ? "Email " : "") + (!PasswordCheck ? "Password " : ""))
            }
        }
    }

    const handleEye = (ref: number) => {
        if (ref == 1) setUichanges((prev) => ({ ...prev, password: !uiUpdates.password }))
        else if (ref == 2) setUichanges((prev) => ({ ...prev, password2: !uiUpdates.password2 }))
    }

    const handleChange = () => {
        if (type == 'Login') navigator('/register')
        else navigator('/login')
    }


    return (
        <div className={styles.LoginAndRegisterBox}>
            <form className={styles.LoginAndRegisterForm} onSubmit={handleSubmit}>
                <div className={styles.title}>
                    {type}
                </div>
                <div className={styles.description}>
                    Hey, Enter your details to get {type} to your account
                </div>
                <div className={styles.content}>
                    {type === "Register" && <>
                        <div className={styles.InputBox}>
                            <label htmlFor="nameInput" className={styles.inputLabel}>Name</label>
                            <input type="text" id='nameInput' className={styles.input} value={inputValues.name} placeholder='Enter Your Name'
                                onChange={(e) => setInputValues((prev) => ({ ...prev, name: e.target.value }))}
                            />
                            {uiUpdates.checks && !NameCheck &&
                                <div className={styles.warning}>one or two words, no extra spacing & between 5 to 30 characters only.</div>}
                        </div>
                    </>}

                    <div className={styles.InputBox}>
                        <label htmlFor="emailInput" className={styles.inputLabel}>Email</label>
                        <input type="email" id='emailInput' className={styles.input} value={inputValues.email} placeholder='Enter Email'
                            onChange={(e) => setInputValues((prev) => ({ ...prev, email: e.target.value }))}
                        />
                        {uiUpdates.checks && !EmailCheck01 &&
                            <div className={styles.warning}>min of 3 and a max of 40 characters @ total 50.</div>}
                    </div>

                    {type === "Register" && <>
                        <div className={styles.InputBox}>
                            <label htmlFor="ageInput" className={styles.inputLabel}>Age</label>
                            <input type="number" id='ageInput' className={styles.input} value={inputValues.age} placeholder='Enter Your Age'
                                onChange={(e) => setInputValues((prev) => ({ ...prev, age: Number(e.target.value) || "" }))}
                            />
                            {uiUpdates.checks && !AgeCheck &&
                                <div className={styles.warning}>age is between 18 to 100</div>}
                        </div>

                        <div className={styles.InputBox}>
                            <label htmlFor="countryInput" className={styles.inputLabel}>Country</label>
                            <select name="country" id="countryInput" className={styles.input} defaultValue={'select'}
                                onChange={(e) => setInputValues((prev) => ({ ...prev, country: e.target.value }))}>
                                <option value={'select'} >Select Your Country</option>
                                {countries.map((ele) => {
                                    return <option key={ele.code} value={ele.code}>{ele.name}</option>
                                })}
                            </select>
                            {uiUpdates.checks && !CountryCheck &&
                                <div className={styles.warning}>Select Valid Country</div>}
                        </div>
                    </>}

                    <div className={styles.InputBox}>
                        <label htmlFor="passwordInput" className={styles.inputLabel}>Password</label>
                        <input type={uiUpdates.password ? "password" : "text"} id='passwordInput' className={styles.input + " " + styles.passwordInput}
                            value={inputValues.password} placeholder='Enter Password'
                            onChange={(e) => setInputValues((prev) => ({ ...prev, password: e.target.value }))}
                        />
                        <div className={styles.eyeIcon} onClick={() => handleEye(1)}>{uiUpdates.password ? <IoMdEyeOff /> : <IoMdEye />}</div>
                        {uiUpdates.checks && !PasswordCheck &&
                            <div className={styles.warning}>no Spacing, atleast contain one capital, small letter, number and one from @, &, *, #, $, !, ? and limit of 8 to 20.</div>}
                    </div>

                    {type === "Register" &&
                        <div className={styles.InputBox}>
                            <label htmlFor="passwordInput2" className={styles.inputLabel}>Password Again</label>
                            <input type={uiUpdates.password2 ? "password" : "text"} id='passwordInput2' className={styles.input + " " + styles.passwordInput}
                                value={inputValues.password2} placeholder='Enter Password Again'
                                onChange={(e) => setInputValues((prev) => ({ ...prev, password2: e.target.value }))}
                            />
                            <div className={styles.eyeIcon} onClick={() => handleEye(2)}>{uiUpdates.password2 ? <IoMdEyeOff /> : <IoMdEye />}</div>
                            {uiUpdates.checks && !PasswordCheck02 &&
                                <div className={styles.warning}>Both the Password should be same.</div>}
                        </div>
                    }
                </div>
                <div className={styles.SubmitBox}>
                    <button className={styles.submitButton} disabled={LoginandRegisterMutation.isPending} type='submit'>
                        {LoginandRegisterMutation.isPending ? "Loading" : type === 'Register' ? 'sign in' : 'log in'}
                    </button>
                </div>
                <div className={styles.changePage}>
                    {type !== 'Register' ? `Don't have account sign in ` : `Already have account log in `}
                    <p className={styles.changePageLink} onClick={handleChange}>here</p>
                </div>
            </form>
        </div>
    )
}