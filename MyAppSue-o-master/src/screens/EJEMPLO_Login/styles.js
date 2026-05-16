// styles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 40,
  },

  header: {
    alignItems: 'center',
    marginBottom: 32,
  },

  logoContainer: {

    width: 82,
    height: 82,

    borderRadius: 26,

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 18,

    backgroundColor: '#5F5AA2',
  },

  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
  },

  card: {

    backgroundColor: '#FFFFFF',

    borderRadius: 24,

    padding: 24,

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  inputGroup: {
    marginBottom: 22,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 10,
  },

  inputContainer: {

    height: 58,

    borderRadius: 18,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 16,

    backgroundColor: '#F8F8F8',

    borderWidth: 1,

    borderColor: 'rgba(0,0,0,0.06)',
  },

  input: {

    flex: 1,

    marginLeft: 12,

    color: '#2D2D2D',

    fontSize: 15,
  },

  forgot: {

    textAlign: 'right',

    color: '#5F5AA2',

    fontSize: 14,

    marginBottom: 24,
  },

  button: {

    height: 58,

    borderRadius: 18,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#5F5AA2',
  },

  buttonText: {

    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '700',
  },

  footer: {

    flexDirection: 'row',

    justifyContent: 'center',

    marginTop: 28,
  },

  footerText: {

    color: '#6B6B6B',

    fontSize: 15,
  },

  register: {

    color: '#5F5AA2',

    fontSize: 15,

    fontWeight: '600',
  },

});