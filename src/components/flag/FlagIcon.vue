<template>
  <span :data-country="name" class="FlagIcon" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FlagIcon',

  props: {
    name: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.FlagIcon {
  display: inline-block;
  background-image: url(~@/assets/images/countries/flagIcons.svg);
  width: 21px;
  height: 15px;
  vertical-align: -2px;

  &[data-country='ad'] {
    background-position: -10px -10px;
  }

  &[data-country='ae'] {
    background-position: -41px -10px;
  }

  &[data-country='ag'] {
    background-position: -72px -10px;
  }

  &[data-country='am'] {
    background-position: -103px -10px;
  }

  &[data-country='ar'] {
    background-position: -134px -10px;
  }

  &[data-country='at'] {
    background-position: -165px -10px;
  }

  &[data-country='au'] {
    background-position: -196px -10px;
  }

  &[data-country='be'] {
    background-position: -227px -10px;
  }

  &[data-country='bf'] {
    background-position: -258px -10px;
  }

  &[data-country='bg'] {
    background-position: -289px -10px;
  }

  &[data-country='bo'] {
    background-position: -320px -10px;
  }

  &[data-country='br'] {
    background-position: -351px -10px;
  }

  &[data-country='ca'] {
    background-position: -382px -10px;
  }

  &[data-country='cd'] {
    background-position: -413px -10px;
  }

  &[data-country='cg'] {
    background-position: -444px -10px;
  }

  &[data-country='ch'] {
    background-position: -475px -10px;
  }

  &[data-country='cl'] {
    background-position: -506px -10px;
  }

  &[data-country='cm'] {
    background-position: -10px -35px;
  }

  &[data-country='cn'] {
    background-position: -41px -35px;
  }

  &[data-country='co'] {
    background-position: -72px -35px;
  }

  &[data-country='cr'] {
    background-position: -103px -35px;
  }

  &[data-country='cz'] {
    background-position: -134px -35px;
  }

  &[data-country='de'] {
    background-position: -165px -35px;
  }

  &[data-country='dj'] {
    background-position: -196px -35px;
  }

  &[data-country='dk'] {
    background-position: -227px -35px;
  }

  &[data-country='dz'] {
    background-position: -258px -35px;
  }

  &[data-country='ec'] {
    background-position: -289px -35px;
  }

  &[data-country='ee'] {
    background-position: -320px -35px;
  }

  &[data-country='eg'] {
    background-position: -351px -35px;
  }

  &[data-country='es'] {
    background-position: -382px -35px;
  }

  &[data-country='eu'] {
    background-position: -413px -35px;
  }

  &[data-country='fi'] {
    background-position: -444px -35px;
  }

  &[data-country='fo'] {
    background-position: -475px -35px;
  }

  &[data-country='fr'] {
    background-position: -506px -35px;
  }

  &[data-country='ga'] {
    background-position: -10px -60px;
  }

  &[data-country='gb'] {
    background-position: -41px -60px;
  }

  &[data-country='gl'] {
    background-position: -72px -60px;
  }

  &[data-country='gm'] {
    background-position: -103px -60px;
  }

  &[data-country='gr'] {
    background-position: -134px -60px;
  }

  &[data-country='gt'] {
    background-position: -165px -60px;
  }

  &[data-country='gu'] {
    background-position: -196px -60px;
  }

  &[data-country='hk'] {
    background-position: -227px -60px;
  }

  &[data-country='hn'] {
    background-position: -258px -60px;
  }

  &[data-country='ht'] {
    background-position: -289px -60px;
  }

  &[data-country='hu'] {
    background-position: -320px -60px;
  }

  &[data-country='id'] {
    background-position: -351px -60px;
  }

  &[data-country='ie'] {
    background-position: -382px -60px;
  }

  &[data-country='il'] {
    background-position: -413px -60px;
  }

  &[data-country='im'] {
    background-position: -444px -60px;
  }

  &[data-country='in'] {
    background-position: -475px -60px;
  }

  &[data-country='iq'] {
    background-position: -506px -60px;
  }

  &[data-country='ir'] {
    background-position: -10px -85px;
  }

  &[data-country='is'] {
    background-position: -41px -85px;
  }

  &[data-country='it'] {
    background-position: -72px -85px;
  }

  &[data-country='je'] {
    background-position: -103px -85px;
  }

  &[data-country='jm'] {
    background-position: -134px -85px;
  }

  &[data-country='jo'] {
    background-position: -165px -85px;
  }

  &[data-country='jp'] {
    background-position: -196px -85px;
  }

  &[data-country='kg'] {
    background-position: -227px -85px;
  }

  &[data-country='kn'] {
    background-position: -258px -85px;
  }

  &[data-country='kp'] {
    background-position: -289px -85px;
  }

  &[data-country='kr'] {
    background-position: -320px -85px;
  }

  &[data-country='kw'] {
    background-position: -351px -85px;
  }

  &[data-country='kz'] {
    background-position: -382px -85px;
  }

  &[data-country='la'] {
    background-position: -413px -85px;
  }

  &[data-country='lb'] {
    background-position: -444px -85px;
  }

  &[data-country='lc'] {
    background-position: -475px -85px;
  }

  &[data-country='ls'] {
    background-position: -506px -85px;
  }

  &[data-country='lt'] {
    background-position: -10px -110px;
  }

  &[data-country='lu'] {
    background-position: -41px -110px;
  }

  &[data-country='lv'] {
    background-position: -72px -110px;
  }

  &[data-country='ma'] {
    background-position: -103px -110px;
  }

  &[data-country='mg'] {
    background-position: -134px -110px;
  }

  &[data-country='mk'] {
    background-position: -165px -110px;
  }

  &[data-country='ml'] {
    background-position: -196px -110px;
  }

  &[data-country='mm'] {
    background-position: -227px -110px;
  }

  &[data-country='mt'] {
    background-position: -258px -110px;
  }

  &[data-country='mx'] {
    background-position: -289px -110px;
  }

  &[data-country='my'] {
    background-position: -320px -110px;
  }

  &[data-country='na'] {
    background-position: -351px -110px;
  }

  &[data-country='ne'] {
    background-position: -382px -110px;
  }

  &[data-country='ng'] {
    background-position: -413px -110px;
  }

  &[data-country='ni'] {
    background-position: -444px -110px;
  }

  &[data-country='nl'] {
    background-position: -475px -110px;
  }

  &[data-country='no'] {
    background-position: -506px -110px;
  }

  &[data-country='nz'] {
    background-position: -10px -135px;
  }

  &[data-country='om'] {
    background-position: -41px -135px;
  }

  &[data-country='pa'] {
    background-position: -72px -135px;
  }

  &[data-country='pe'] {
    background-position: -103px -135px;
  }

  &[data-country='pg'] {
    background-position: -134px -135px;
  }

  &[data-country='ph'] {
    background-position: -165px -135px;
  }

  &[data-country='pk'] {
    background-position: -196px -135px;
  }

  &[data-country='pl'] {
    background-position: -227px -135px;
  }

  &[data-country='pr'] {
    background-position: -258px -135px;
  }

  &[data-country='ps'] {
    background-position: -289px -135px;
  }

  &[data-country='pt'] {
    background-position: -320px -135px;
  }

  &[data-country='py'] {
    background-position: -351px -135px;
  }

  &[data-country='qa'] {
    background-position: -382px -135px;
  }

  &[data-country='remote'] {
    background-position: -413px -135px;
  }

  &[data-country='ro'] {
    background-position: -444px -135px;
  }

  &[data-country='ru'] {
    background-position: -475px -135px;
  }

  &[data-country='rw'] {
    background-position: -506px -135px;
  }

  &[data-country='sa'] {
    background-position: -10px -160px;
  }

  &[data-country='se'] {
    background-position: -41px -160px;
  }

  &[data-country='sg'] {
    background-position: -72px -160px;
  }

  &[data-country='si'] {
    background-position: -103px -160px;
  }

  &[data-country='sk'] {
    background-position: -134px -160px;
  }

  &[data-country='sl'] {
    background-position: -165px -160px;
  }

  &[data-country='sn'] {
    background-position: -196px -160px;
  }

  &[data-country='so'] {
    background-position: -227px -160px;
  }

  &[data-country='sv'] {
    background-position: -258px -160px;
  }

  &[data-country='td'] {
    background-position: -289px -160px;
  }

  &[data-country='th'] {
    background-position: -320px -160px;
  }

  &[data-country='tj'] {
    background-position: -351px -160px;
  }

  &[data-country='tl'] {
    background-position: -382px -160px;
  }

  &[data-country='tr'] {
    background-position: -413px -160px;
  }

  &[data-country='tw'] {
    background-position: -444px -160px;
  }

  &[data-country='tz'] {
    background-position: -475px -160px;
  }

  &[data-country='ua'] {
    background-position: -506px -160px;
  }

  &[data-country='us'] {
    background-position: -10px -185px;
  }

  &[data-country='uy'] {
    background-position: -41px -185px;
  }

  &[data-country='ve'] {
    background-position: -72px -185px;
  }

  &[data-country='vn'] {
    background-position: -103px -185px;
  }

  &[data-country='xx'] {
    background-position: -134px -185px;
  }

  &[data-country='ye'] {
    background-position: -165px -185px;
  }

  &[data-country='za'] {
    background-position: -196px -185px;
  }
}
</style>
