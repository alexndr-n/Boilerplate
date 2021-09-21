<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h2 class="card-header-title">Login</h2>
      </div>
      <div class="card-content">
        <form @submit.prevent="logIn">
          <b-field label="Email">
            <input
              class="input"
              type="email"
              name="email"
              id=""
              v-model="email"
            />
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="password" password-reveal />
          </b-field>
          <input
            class="m-auto button is-success submit-btn"
            type="submit"
            value="Submit"
          />
          <div class="forgot-password" @click.prevent="resetPassword">
            Reset Password
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    async logIn() {
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (!response) {
            this.setNotification({
              type: 'is-danger',
              text: 'There was an error. Please contact support.',
            })
          } else {
            window.location.href = '/'
          }
        })
        .catch((error) => {
          console.log(error)
          if (
            error.response.data.message ==
            'User with provided email not found in database.'
          ) {
            this.setNotification({
              type: 'is-danger',
              text: 'User with provided email not found in database.',
            })
          } else if (error.response.data.message == 'Invalid Password') {
            this.setNotification({
              type: 'is-danger',
              text: 'Invalid Password',
            })
          } else {
            this.setNotification({
              type: 'is-danger',
              text: 'There was an error. Please contact support.',
            })
          }
        })
    },
    resetPassword() {
      if (!this.email) {
        this.setNotification({
          type: 'is-danger',
          text: 'Please enter your email.',
        })
      } else {
        this.$axios
          .$post('/auth/forgot-password', {
            email: this.email,
          })
          .then((response) => {
            if (response.text == 'There is no account with such email') {
              this.setNotification({
                type: 'is-danger',
                text: 'There is no account with such email',
              })
            } else if (response.type == 'success') {
              this.setNotification({
                type: 'is-success',
                text:
                  'A password reset email has been sent to ' + this.email,
              })
            } else {
              this.setNotification({
                type: 'is-danger',
                text: 'There was an error. Please contact support.',
              })
            }
          })
          .catch((error) => {
            this.setNotification({
              type: 'is-danger',
              text: 'There was an error. Please contact support.',
            })
          })
      }
    },
  },
}
</script>

<style scoped>
.submit-btn {
  width: 100%;
  margin-top: 10px;
}
.forgot-password {
  text-align: center;
  margin: 10px auto;
  color: #134985;
  cursor: pointer;
}
.counter {
  display: none;
}
</style>
