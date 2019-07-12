<template>
  <div class="hello">

    <div class="jumbotron text-center">
      <h3 class="display-4">Simple Notebok</h3>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md">
          <h3>Adicionar Nota</h3>
          <button type="button" class="btn btn-primary"><i class="fa fa-plus"></i> Nova nota</button>
        </div>
        <div class="col-md">
          <h3>Entrada</h3>
            <div class="form-group green-border-focus">
            <textarea class="form-control" rows="3"></textarea>
            </div>
        </div>
        <div class="col-md">
          <h3>Visualizar</h3> 
          <div class="float-center">Float left on all viewport sizes</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
