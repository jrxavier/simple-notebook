<template>
  <div class="hello">
    <div class="jumbotron text-center">
      <h3 class="display-4">Simple Notebok</h3>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md">
          <h3>Adicionar Nota</h3>
          <button type="button" class="btn btn-primary" @click="addNote" :title="addButtonTitle">
            <i class="fa fa-plus"></i> Nova nota
          </button>
          <div
            v-for="note in notes"
            @click="selectNote(note)"
            :class="{selected: note === notaSelecionada}"
          >{{note.title}}</div>
        </div>
        <template v-if="notaSelecionada">
          <div class="col-md">
            <h3>Entrada</h3>
            <div class="form-group green-border-focus">
              <textarea v-model="notaSelecionada.content" class="form-control" rows="3"></textarea>
            </div>
          </div>
          <div class="col-md">
            <h3>Visualizar</h3>
            <section class="main">
              <aside class="preview" v-html="notePreview"></aside>
            </section>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      content:
        localStorage.getItem("content") || "You can write in **markdown**",
      notes: [],
      selectedId: null
    };
  },
  created() {
    this.content =
      localStorage.getItem("content") || "You can write in **markdown** ";
  },
  methods: {
    saveNote(val) {
      localStorage.setItem("content", val);
    },
    addNote() {
      const time = Date.now();
      const note = {
        id: String(time),
        title: "New note " + (this.notes.length + 1),
        content: "**Ola!** Nova nota",
        created: time,
        favorite: false
      };
      this.notes.push(note);
    },
    selectNote(note) {
      this.selectedId = note.id;
    }
  },
  computed: {
    notePreview() {
      return this.notaSelecionada ? marked(this.notaSelecionada.content) : "";
    },
    addButtonTitle() {
      return this.notes.length + " note(s) already";
    },
    notaSelecionada() {
      return this.notes.find(note => note.id === this.selectedId);
    }
  },
  watch: {
    content: "saveNote"
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
