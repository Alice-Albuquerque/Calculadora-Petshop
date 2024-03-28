$(document).ready(function() {
  $('#datepicker').datepicker({
      dateFormat: 'dd/mm/yy',
      minDate: 0 // seleção para datas a partir de hoje
  });

  $('#calculate').click(function() {
      var date = $('#datepicker').datepicker('getDate');
      var smallDogs = parseInt($('#small-dogs').val());
      var largeDogs = parseInt($('#large-dogs').val());

      if (date && smallDogs >= 0 && largeDogs >= 0) {
          var dayOfWeek = date.getDay();
          var isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sábado ou domingo

          var petshops = [
              { name: 'Meu Canino Feliz', distance: 2, smallPrice: 20, largePrice: 40, weekendMarkup: 0.20 },
              { name: 'Vai Rex', distance: 1.7, smallPrice: 15, largePrice: 50, weekendSmallPrice: 20, weekendLargePrice: 55 },
              { name: 'ChowChawgas', distance: 0.8, smallPrice: 30, largePrice: 45 }
          ];

          var bestPetshop = petshops.reduce(function(acc, petshop) {
              var smallPrice, largePrice;

              if (isWeekend) {
                  smallPrice = petshop.weekendSmallPrice || petshop.smallPrice;
                  largePrice = petshop.weekendLargePrice || petshop.largePrice;
              } else {
                  smallPrice = petshop.smallPrice;
                  largePrice = petshop.largePrice;
              }

              var totalPrice = smallDogs * smallPrice + largeDogs * largePrice;

              return totalPrice < acc.totalPrice || (totalPrice === acc.totalPrice && petshop.distance < acc.petshop.distance) ? { totalPrice: totalPrice, petshop: petshop } : acc;
          }, { totalPrice: Infinity, petshop: null });

          var resultText = 'A melhor opção de Petshop:  ' + bestPetshop.petshop.name + '<br><br>Preço total: R$' + bestPetshop.totalPrice.toFixed(2);
          $('#result').html(resultText);
          $('#popup').show();
      } else {
          alert('Por favor, preencha todos os campos corretamente.');
      }
  });

  $('.close').click(function() {
      $('#popup').hide();
  });
});
