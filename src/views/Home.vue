<template>
  <!-- TODO:: ADD FORM FIELD -->

  <div class="row">
    <div class="col-lg-12">
      <div class="d-flex align-items-center justify-content-between">
        <div class="card p-3 shadow mb-4">
          <form @submit="saveReminder">
            <div class="mb-3 text-left">
              <label class="form-label">Message</label>
              <input type="text" class="form-control" v-model="myMessage" />
            </div>

            <div class="mb-3">
              <label class="form-label">Day</label>
              <input type="date" class="form-control" v-model="date" />
            </div>

            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="remindme"
              />
              <label class="form-check-label" for="exampleCheck1"
                >Remind me?</label
              >
            </div>
            <button type="submit" class="btn btn-primary">
              {{ forEdit ? "Update" : "Save" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- TODO:: LIST ALL DATA -->

  <table class="table table striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Message</th>
        <th>Day</th>
        <th>Remind Me</th>
        <th colspan="2">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(alarm, index) in $store.state.reminders" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ alarm.message }}</td>
        <td>{{ alarm.day }}</td>
        <td>{{ alarm.remind_me ? "Yes" : "No" }}</td>
        <td>
          <button
            class="btn btn-sm btn-primary"
            @click="editRecord(index, alarm._id)"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            @click="deleteRecord(alarm._id)"
            class="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      myMessage: "",
      date: "",
      remindme: false,
      forEdit: false,
      toEditId: "",
    };
  },
  methods: {
    editRecord(index, reminderId) {
      this.toEditId = reminderId;
      this.forEdit = true;

      const selectedReminder = this.$store.state.reminders[index];

      this.myMessage = selectedReminder.message;
      this.date = selectedReminder.day;
      this.remindme = selectedReminder.remind_me;
    },
    async deleteRecord(reminderId) {
      if (confirm("Are you sure you want to delete this reminder?")) {
        const api = `https://crudcrud.com/api/17a479f9c35d4d58ba4d494b12926472/reminders/${reminderId}`;
        const requestOptions = {
          method: "DELETE",
          // headers: { "Content-Type": "application/json" },
        };

        const response = await fetch(api, requestOptions);
      }
    },
    async saveReminder(e) {
      e.preventDefault();

      let api =
        "https://crudcrud.com/api/17a479f9c35d4d58ba4d494b12926472/reminders";

      if (this.forEdit) {
        api = api + "/" + this.toEditId;
      }

      const payload = {
        message: this.myMessage,
        day: this.date,
        remind_me: this.remindme,
      };

      const requestOptions = {
        method: this.forEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };

      const response = await fetch(api, requestOptions);
      let result = response;
      if (!this.forEdit) {
        result = await response.json();
      }

      console.log("response is ", result);

      // get all data again
      this.$store.dispatch("getAll");
      /**
       *
       *
       */
    },
  },

  async created() {
    await this.$store.dispatch("getAll");
  },
};
</script>


