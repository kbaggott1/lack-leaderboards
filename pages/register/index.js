export default function Register() {
    return (
        <div className="form-container">
            <form>
                <div>
                    <input type="text" className='text-input' name="email" placeholder="Email" />
                </div>
                <div>
                    <input type="password" className='text-input' name="password" placeholder="Password" />
                </div>
                <div>
                    <input type="password" className='text-input' name="retype-password" placeholder="Retype Password" />
                </div>
                <button type="submit" className='button-submit'>Register</button>
            </form>
        </div>
    );
}
