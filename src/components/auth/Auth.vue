<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="200" alt="logo" />
            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login'}}</div>
            <input type="text" v-if="showSignup" v-model="user.name" placeholder="Nome" />
            <input type="text" v-model="user.email" placeholder="E-mail" />
            <input type="password" v-model="user.password" placeholder="Senha" />
            <input type="password" v-if="showSignup" 
                v-model="user.confirmPassword" placeholder="Confirme a senha" />
            
            <button v-if="showSignup" @click="signup">Registrar</button>
            <button v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesso o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
import api from '@/services/api'
import { showError } from '@/config/toastMsgs'
import userKey from '@/config/localStorage'

const Auth = {
    name: 'Auth',
    data: function () {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        async signin() {
            try {
                const res = await api.post('/signin', this.user)
                this.$store.commit('setUser', res.data)
                localStorage.setItem(userKey, JSON.stringify(res.data))
                this.$router.push({ path: '/' })
            } catch (err) {
                showError(err)
            }
        },
        async signup() {
            try {
                await api.post('/signup', this.user)
                this.$toasted.global.defaultSuccess()
                this.user = {}
                this.showSignup = false
            } catch (err) {
                showError(err)
            }
        }
    }
}

export default Auth
</script>

<style>
    .auth-content {
        height: 100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: center;
        background-color: #2460ae;
        color: #FFF;
        padding: 5px 15px;
        border-radius: 15px;
        outline: none;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(to right, rgba(120, 120, 120, 0.25),
         rgba(120, 120, 120, 0.75), rgba(120, 120, 120, 1));
    }
</style>